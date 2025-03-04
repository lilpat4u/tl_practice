using Domain.Entities;

namespace Domain.Repositories;

public interface ITheaterRepository : IRepositories<Theater>
{
    public Theater GetById( int id );
    public Theater Update( int id, Theater theater );
}