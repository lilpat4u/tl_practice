using Accommodations;
using Accommodations.Commands;
using Accomodations;

public class BookCommand : ICommand
{
    private readonly IBookingService _bookingService;
    private readonly BookingDto _bookingDto;
    private Booking _executedBookingDto;

    public BookCommand( IBookingService bookingService, BookingDto bookingDto )
    {
        _bookingService = bookingService;
        _bookingDto = bookingDto;
    }

    public void Execute()
    {
        try
        {
            _executedBookingDto = _bookingService.Book( _bookingDto.UserId, _bookingDto.Category, _bookingDto.StartDate, _bookingDto.EndDate, _bookingDto.ApplyDiscount );
            Console.WriteLine( $"Booking successful: ID {_executedBookingDto.Id}" );
        }
        catch ( Exception ex )
        {
            Console.WriteLine( $"Error during booking: {ex.Message}" );
        }
    }

    public void Undo()
    {
        try
        {
            _bookingService.CancelBooking( _executedBookingDto.Id );
            decimal cancellationPenalty = _bookingService.CalculateCancellationPenaltyAmount( _executedBookingDto );
            Console.WriteLine( $"Booking {_executedBookingDto.Id} was canceled. Cancellation penalty: {cancellationPenalty}" );
        }
        catch ( Exception ex )
        {
            Console.WriteLine( $"Error during cancellation: {ex.Message}" );
        }
    }
}
