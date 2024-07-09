using Accommodations;
using Accommodations.Commands;
using Accomodations; 

public class FindBookingByIdCommand : ICommand
{
    private readonly BookingService _bookingService;
    private readonly Guid _bookingId;

    public FindBookingByIdCommand( BookingService bookingService, Guid bookingId )
    {
        _bookingService = bookingService;
        _bookingId = bookingId;
    }

    public void Execute()
    {
        try
        {
            Booking? booking = _bookingService.FindBookingById( _bookingId );
            if ( booking != null )
            {
                Console.WriteLine( $"Booking found: {booking.Category} for User {booking.UserId}" );
            }
            else
            {
                Console.WriteLine( "Booking not found." );
            }
        }
        catch ( Exception ex )
        {
            Console.WriteLine( $"Error during finding booking: {ex.Message}" );
        }
    }

    public void Undo()
    {
        Console.WriteLine( $"Undo operation is not supported for {GetType().Name}." );
    }
}
