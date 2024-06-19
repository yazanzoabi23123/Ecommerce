namespace E_commerce.Exceptions
{
    public class UserAlreadyExistsException:Exception
    {
        public UserAlreadyExistsException(string message) :base(message)
        {
            
        }
    }
}
