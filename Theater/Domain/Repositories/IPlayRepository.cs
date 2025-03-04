using Domain.Entities;

namespace Domain.Repositories;

public interface IPlayRepository : IRepositories<Play>
{
    public Play GetById( int id );
    public List<Play> GetByTheaterId( int TheaterId );
    List<Play> GetByCompositionId( int compositionId );
}
