using E_commerce.Models.Users;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using E_commerce.Models.Products;

namespace E_commerce.Models.Cart
{
    public class UserProductCart
    {
        //[Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //[ForeignKey("User")]
        public string User_Id { get; set; }
        public UserSqlModel User { get; set; }

        //[ForeignKey("Product")]
        public string Product_Id { get; set; }
        public ProductSqlModel Product { get; set; }
    }
}
