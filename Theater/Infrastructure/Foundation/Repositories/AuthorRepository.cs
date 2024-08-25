using Domain.Entities;
using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class AuthorRepository : Repository<Author>, IAuthorRepository
    {
        public AuthorRepository( TheaterDbContext context )
            : base( context )
        {
        }

        public Author GetById( int id )
        {
            return _dbContext.Set<Author>().FirstOrDefault( a => a.Id == id );
        }
    }
}