using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class CompositionRepository : Repository<Composition>, ICompositionRepository
    {
        public CompositionRepository( TheaterDbContext context )
            : base( context )
        {
        }

        public Composition GetById( int id )
        {
            return _dbContext.Set<Composition>().FirstOrDefault( c => c.Id == id );
        }

        public List<Composition> GetByAuthorId( int authorId )
        {
            return _dbContext.Set<Composition>().Where( c => c.AuthorId == authorId ).ToList();
        }
    }
}