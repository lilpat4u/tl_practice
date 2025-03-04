using Domain.Entities;

namespace Domain.Repositories;

public interface IRepositories<T> where T : class
{
    public List<T> GetAll();
    public void Add( T item );
    public void Remove( T item );
}