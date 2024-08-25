using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class WorkingHoursRepository : Repository<WorkingHours>, IWorkingHoursRepository
    {
        public WorkingHoursRepository( TheaterDbContext context )
            : base( context )
        {
        }

        public WorkingHours GetById( int id )
        {
            return _dbContext.Set<WorkingHours>().FirstOrDefault( wh => wh.Id == id );
        }

        public List<WorkingHours> GetByTheaterId( int TheaterId )
        {
            return _dbContext.Set<WorkingHours>().Where( wh => wh.TheaterId == TheaterId ).ToList();
        }
    }
}