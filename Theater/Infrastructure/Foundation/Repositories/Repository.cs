using Domain.Repositories;

namespace Infrastructure.Foundation.Repositories
{
    public class Repository<T> : IRepositories<T> where T : class
    {
        protected readonly TheaterDbContext _dbContext;

        public Repository( TheaterDbContext dbContext )
        {
            _dbContext = dbContext;
        }

        public void Add( T item )
        {
            _dbContext.Set<T>().Add( item );
            _dbContext.SaveChanges();
        }

        public List<T> GetAll()
        {
            return _dbContext.Set<T>().ToList();
        }

        public void Remove( T item )
        {
            _dbContext.Set<T>().Remove( item );
            _dbContext.SaveChanges();
        }
    }
}