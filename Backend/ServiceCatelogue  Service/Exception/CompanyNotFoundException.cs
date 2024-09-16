namespace ServiceCatelogue__Service.Exception
{
    public class CompanyNotFoundException:ApplicationException
    {
        public CompanyNotFoundException(int id):base($"Company with id: {id} not found")
        {
            
        }
    }
}
