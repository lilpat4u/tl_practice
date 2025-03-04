using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Foundation.Configurations
{
    public class TheaterConfiguration : IEntityTypeConfiguration<Theater>
    {
        public void Configure( EntityTypeBuilder<Theater> builder )
        {
            builder.ToTable( nameof( Theater ) )
                .HasKey( t => t.Id );

            builder.Property( t => t.Name )
                .HasMaxLength( 30 )
                .IsRequired();

            builder.Property( t => t.Address )
                .HasMaxLength( 50 )
                .IsRequired();

            builder.Property( t => t.OpeningDate )
                .IsRequired();

            builder.Property( t => t.Description )
                .HasMaxLength( 300 )
                .IsRequired();

            builder.Property( t => t.PhoneNumber )
                .HasMaxLength( 20 )
                .IsRequired();

            builder.HasMany( t => t.WorkingHours )
                .WithOne( wh => wh.Theater )
                .HasForeignKey( wh => wh.TheaterId )
                .OnDelete( DeleteBehavior.Cascade );

            builder.HasMany( t => t.Plays )
               .WithOne( p => p.Theater )
               .HasForeignKey( p => p.TheaterId )
               .OnDelete( DeleteBehavior.Cascade );
        }
    }
}