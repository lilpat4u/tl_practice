using Domain.Entities;

namespace Domain.Repositories;

public interface IAuthorRepository : IRepositories<Author>
{
    public Author GetById( int id );
}