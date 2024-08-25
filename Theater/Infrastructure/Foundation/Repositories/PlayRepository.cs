using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class PlayRepository : Repository<Play>, IPlayRepository
    {
        public PlayRepository( TheaterDbContext context )
            : base( context )
        {
        }

        public Play GetById( int id )
        {
            return _dbContext.Set<Play>().FirstOrDefault( p => p.Id == id );
        }

        public List<Play> GetByTheaterId( int theater )
        {
            return _dbContext.Set<Play>().Where( p => p.TheaterId == theater ).ToList();
        }

        public List<Play> GetByCompositionId( int composition )
        {
            return _dbContext.Set<Play>().Where( p => p.CompositionId == composition ).ToList();
        }
    }
}