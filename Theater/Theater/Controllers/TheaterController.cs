using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Theater.Contracts.Requests;

namespace Theater.Controllers
{
    [ApiController]
    [Route( "api/theater" )]
    public class TheaterController : ControllerBase
    {
        private readonly ITheaterRepository _theaterRepository;

        public TheaterController( ITheaterRepository theaterRepository )
        {
            _theaterRepository = theaterRepository;
        }

        [HttpGet]
        public IActionResult GetAllTheaters()
        {
            var theaters = _theaterRepository.GetAll();

            return Ok( theaters );
        }

        [HttpGet, Route( "{id:int}" )]
        public IActionResult GetTheater( [FromRoute] int id )
        {
            var theater = _theaterRepository.GetById( id );
            if ( theater == null )
            {
                return NotFound( $"There is no theater with such id = {id}" );
            }

            return Ok( theater );
        }

        [HttpPost]
        public IActionResult CreateTheater( [FromBody] CreateTheaterRequest theater )
        {
            var newTheater = new Domain.Entities.Theater( theater.Name, theater.Address, theater.OpeningDate, theater.Description, theater.PhoneNumber );

            if ( theater.WorkingHours != null )
            {
                foreach ( var wh in theater.WorkingHours )
                {
                    var workingHours = new WorkingHours( wh.OpeningDate, wh.ClosingDate, wh.IsWeekend );
                    newTheater.WorkingHours.Add( workingHours );
                }
            }

            _theaterRepository.Add( newTheater );

            return Ok( newTheater );
        }

        [HttpPut, Route( "{id:int}" )]
        public IActionResult UpdateTheater( [FromRoute] int id, [FromBody] UpdateTheaterRequest theater )
        {
            var newTheater = _theaterRepository.GetById( id );

            if ( newTheater == null )
            {
                return NotFound( $"There is no theater with such id = {id}" );
            }

            newTheater.Update( theater.Name, theater.Description, theater.PhoneNumber );
            var updatedTheatre = _theaterRepository.Update( id, newTheater );
            return Ok( updatedTheatre );
        }

        [HttpDelete, Route( "{id:int}" )]
        public IActionResult DeletePlay( [FromRoute] int id )
        {
            var theater = _theaterRepository.GetById( id );
            if ( theater == null )
            {
                return NotFound( $"Theater with such id = {id} does not exist" );
            }

            _theaterRepository.Remove( theater );
            return Ok();
        }
    }
}