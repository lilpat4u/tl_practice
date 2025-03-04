using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Foundation.Configurations
{
    public class WorkingHoursConfiguration : IEntityTypeConfiguration<WorkingHours>
    {
        public void Configure( EntityTypeBuilder<WorkingHours> builder )
        {
            builder.ToTable( nameof( WorkingHours ) )
                .HasKey( wh => wh.Id );

            builder.Property( wh => wh.OpeningDate )
                .IsRequired();

            builder.Property( wh => wh.ClosingDate )
                .IsRequired();

            builder.Property( wh => wh.IsWeekend )
                .IsRequired();

            builder.HasOne( wh => wh.Theater )
                .WithMany( t => t.WorkingHours )
                .HasForeignKey( wh => wh.TheaterId )
                .OnDelete( DeleteBehavior.Cascade );
        }
    }
}