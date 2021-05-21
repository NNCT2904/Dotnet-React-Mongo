using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using BookStore.Services;
using BookStore.Models;

namespace BookStore.Controllers
{
    //[Authorize]
    public class PostController : ControllerBase
    {
        private readonly PostService _postSvc;

        public PostController(PostService postService)
        {
            _postSvc = postService;
        }

        [AllowAnonymous]
        [HttpGet("api/posts/checkapi")]
        public ActionResult Check() => Ok("API ok!");

        [AllowAnonymous]
        public ActionResult<IList<Post>> Index() => _postSvc.Read().ToList();

        [HttpPost("api/posts/create")]
        //[ValidateAntiForgeryToken]
        public ActionResult<Post> Create(Post post)
        {
            //post.Created = post.LastUpdated = DateTime.Now;
            //post.UserId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            //post.UserName = User.Identity.Name;

            if (ModelState.IsValid)
            {
                _postSvc.Create(post);
            }
            return Ok(post);
        }

        [HttpGet]
        public ActionResult<Post> Find(string id) => _postSvc.Find(id);

        [HttpPost]
        public ActionResult Edit(Post post)
        {
            post.LastUpdated = DateTime.Now;
            post.Created = post.Created.ToLocalTime();

            if (ModelState.IsValid)
            {
                if (User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value != post.UserId)
                {
                    return Unauthorized();
                }
                _postSvc.Update(post);
                return Ok("Post updated");
            }
            return Unauthorized();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _postSvc.Delete(id);
            return Ok("Deleted");
        }
    }
}
