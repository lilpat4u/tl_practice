using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Foundation.Configurations
{
    public class AuthorConfiguration : IEntityTypeConfiguration<Author>
    {
        public void Configure( EntityTypeBuilder<Author> builder )
        {
            builder.ToTable( nameof( Author ) )
                    .HasKey( a => a.Id );

            builder.Property( a => a.Name )
                    .HasMaxLength( 150 )
                    .IsRequired();

            builder.Property( a => a.DateBirth )
                    .IsRequired();

            builder.HasMany( a => a.Composition )
                    .WithOne( c => c.Author )
                    .HasForeignKey( c => c.AuthorId )
                    .OnDelete( DeleteBehavior.Cascade );
        }
    }
}