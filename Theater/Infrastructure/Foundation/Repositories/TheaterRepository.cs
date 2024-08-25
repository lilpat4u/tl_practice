using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class TheaterRepository : Repository<Theater>, ITheaterRepository
    {
        public TheaterRepository( TheaterDbContext context )
            : base( context )
        {
        }

        public Theater GetById( int id )
        {
            return _dbContext.Set<Theater>().FirstOrDefault( t => t.Id == id );
        }

        public Theater Update( int id, Theater theater )
        {
            var oldTheater = _dbContext.Set<Theater>().FirstOrDefault( t => t.Id == id );
            if ( theater == null )
            {
                return null;
            }
            _dbContext.Update( theater );
            _dbContext.SaveChanges();

            return theater;
        }
    }
}