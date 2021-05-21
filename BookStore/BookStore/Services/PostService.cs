using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Services
{
    
    public class PostService
    {
        private readonly IMongoCollection<Post> _posts;

        public PostService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _posts = database.GetCollection<Post>("Posts");
        }

        public Post Create(Post post)
        {
            _posts.InsertOne(post);
            return post;
        }
        public void Update(Post post) => _posts.ReplaceOne(p => p.Id == post.Id, post);

        public IList<Post> Read() => _posts.Find(sub => true).ToList();

        public void Delete(string id) => _posts.DeleteOne(p => p.Id == id);

        public Post Find(string id) => _posts.Find(p => p.Id == id).SingleOrDefault();




    }
}
