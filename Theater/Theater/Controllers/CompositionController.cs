using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Theater.Contracts.Requests;

namespace Theater.Controllers
{
    [ApiController]
    [Route( "api/composition" )]
    public class CompositionController : ControllerBase
    {
        private readonly ICompositionRepository _compositionRepository;

        public CompositionController( ICompositionRepository compositionRepository )
        {
            _compositionRepository = compositionRepository;
        }

        [HttpGet]
        public IActionResult GetAllCompositions()
        {
            List<Composition> compositions = _compositionRepository.GetAll();

            return Ok( compositions );
        }

        [HttpGet, Route( "{id:int}" )]
        public IActionResult GetComposition( [FromRoute] int id )
        {
            Composition composition = _compositionRepository.GetById( id );
            if ( composition == null )
            {
                return NotFound( $"There is no composition with such id = {id}" );
            }

            return Ok( composition );
        }

        [HttpGet, Route( "author/{authorId:int}" )]
        public IActionResult GetByAuthorId( [FromRoute] int authorId )
        {
            List<Composition> compositions = _compositionRepository.GetByAuthorId( authorId );

            return Ok( compositions );
        }

        [HttpPost]
        public IActionResult CreateComposition( [FromBody] CreateCompositionRequest composition )
        {
            Composition newComposition = new Composition( composition.Name, composition.ShortDescription, composition.CharactersInfo, composition.AuthorId );
            _compositionRepository.Add( newComposition );

            return Ok( newComposition );
        }

        [HttpDelete, Route( "{id:int}" )]
        public IActionResult DeleteComposition( [FromRoute] int id )
        {
            Composition composition = _compositionRepository.GetById( id );
            if ( composition == null )
            {
                return NotFound( $"Composition with such id = {id} does not exist" );
            }

            _compositionRepository.Remove( composition );
            return Ok();
        }
    }
}
