using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Foundation.Configurations
{
    public class CompositionConfiguration : IEntityTypeConfiguration<Composition>
    {
        public void Configure( EntityTypeBuilder<Composition> builder )
        {
            builder.ToTable( nameof( Composition ) )
                .HasKey( c => c.Id );

            builder.Property( c => c.Name )
                .HasMaxLength( 150 )
                .IsRequired();

            builder.Property( c => c.ShortDescription )
                .HasMaxLength( 350 )
                .IsRequired();

            builder.Property( c => c.CharactersInfo )
                .HasMaxLength( 350 )
                .IsRequired();

            builder.HasMany( c => c.Plays )
                .WithOne( p => p.Composition )
                .HasForeignKey( p => p.CompositionId )
                .OnDelete( DeleteBehavior.Cascade );
        }
    }
}