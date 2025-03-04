using Domain.Entities;

namespace Domain.Repositories;

public interface ICompositionRepository : IRepositories<Composition>
{
    public Composition GetById( int id );
    public List<Composition> GetByAuthorId( int authorId );
}