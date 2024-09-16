using Authentication_Serivce.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using Authentication_Serivce.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit.Sdk;
using Xunit.Abstractions;
using MongoDB.Bson;


namespace BackEnd_API_test.Authentication
{
    
    public class AuthenticationAPITest
    {
        private readonly DbContextOptions<AuthdbContext> _options;
       

        public AuthenticationAPITest()
        {
            _options = new DbContextOptionsBuilder<AuthdbContext>().UseInMemoryDatabase(databaseName:"User").Options;
            var newUser = new User { id = 1, email = "user1@gmail.com", name = "User1", password = "User@1234", phoneNumber = "8976543654" };
            var context = new AuthdbContext(_options);
            var controller = new AuthController(context);
            controller.Register(newUser);

        }
        
        
        [Fact]
        public async Task New_User_Register()
        {
            //arrange
            var newUser = new User{ id=1,email="user2@gmail.com",name="User2",password="User@1234",phoneNumber="8976543654"};
            
            //act
            var context = new AuthdbContext(_options);
            var controller = new AuthController(context);
            var result=  await controller.Register(newUser);

            
            //assert
            Assert.IsType<OkObjectResult>(result);
            
            
        }

        [Fact]
        public async Task New_User_Register_with_Registered_Mail()
        {
            //arrange
            
            var newUser = new User { id = 1, email = "user1@gmail.com", name = "User1", password = "User@1234", phoneNumber = "8976543654" };
            //act
            var context = new AuthdbContext(_options);
            var controller = new AuthController(context);
          
            var result = await controller.Register(newUser);
            
            //assert
            Assert.IsType<BadRequestObjectResult>(result);

        }

        [Fact]
        public async Task User_Log_In_With_Correct_Credentials()
        {
            var logCred = new Login { Email = "user1@gmail.com", Password = "User@1234" };
            var context = new AuthdbContext(_options);

            var controller = new AuthController(context);

            var result = await controller.Login(logCred);
          
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task User_Log_In_With_Wrong_Email()
        {
            var logCred = new Login { Email = "u1@gmail.com", Password = "User@1234" };
            var context = new AuthdbContext(_options);

            var controller = new AuthController(context);
            
            var result = await controller.Login(logCred);

           
            Assert.IsType<UnauthorizedResult>(result);
        }

        [Fact]
        public async Task User_Log_In_With_Wrong_Password()
        {
            var logCred = new Login { Email = "user1@gmail.com", Password = "User@" };
            var context = new AuthdbContext(_options);

            var controller = new AuthController(context);

            var result = await controller.Login(logCred);


            Assert.IsType<UnauthorizedResult>(result);
        }


        
    }
}
