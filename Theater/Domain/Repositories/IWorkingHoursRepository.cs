using Domain.Entities;

namespace Domain.Repositories;

public interface IWorkingHoursRepository : IRepositories<WorkingHours>
{
    public WorkingHours GetById( int id );
    public List<WorkingHours> GetByTheaterId( int id );
}