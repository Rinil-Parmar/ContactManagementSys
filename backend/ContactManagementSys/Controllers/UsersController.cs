using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactManagementSys.Models;

namespace ContactManagementSys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ContactContext _context;

        public UsersController(ContactContext context)
        {
            _context = context;
        }

     /*   // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }*/

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.userId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /* // POST: api/Users
         // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
         [HttpPost]
         public async Task<ActionResult<Users>> PostUsers(Users users)
         {
             _context.Users.Add(users);
             await _context.SaveChangesAsync();

             return CreatedAtAction("GetUsers", new { id = users.userId }, users);
         }*/

        //api/users
        [HttpPost("signup")]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            byte[] encData_byte = new byte[users.Password.Length];
            encData_byte = System.Text.Encoding.UTF8.GetBytes(users.Password);
            users.Password = Convert.ToBase64String(encData_byte);
            _context.Users.Add(users);
            await _context.SaveChangesAsync();
            return users;
        }

        // POST api/<usersController>
        [HttpPost("login")]
        public async Task<ActionResult<Users>> Login(Users user)
        {
            Users users = _context.Users.FirstOrDefault(u => u.Username ==
           user.Username || u.Email == user.Email);
            if (users == null)
            {
                return NotFound();
            }
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decoder = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(users.Password);
            int charCount = utf8Decoder.GetCharCount(todecode_byte, 0,
           todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decoder.GetChars(todecode_byte, 0, todecode_byte.Length,
           decoded_char, 0);
            string result = new string(decoded_char);
            Users res = new Users();
            if (user.Password == result)
            {
                res = users;
            }
            else
            {
                res = null;
            }
            return res;
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.userId == id);
        }
    }
}
