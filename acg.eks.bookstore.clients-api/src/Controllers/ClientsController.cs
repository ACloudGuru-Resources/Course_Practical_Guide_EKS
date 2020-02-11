using ACG.EKS.Bookstore.Clients_API.Models;
using ACG.EKS.Bookstore.Clients_API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ACG.EKS.Bookstore.Clients_API.Controllers
{
    [Route("[action]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientsController(ClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Client>>> List() =>
            await _clientService.List();
            
        [Route("/get/{id}")]
        [HttpGet("/get/{id:length(38)}", Name = "GetClient")]
        public async Task<ActionResult<Client>> Get(string id) 
        {
            var client = await _clientService.Get(id);

            if(client == null) 
                return NotFound();

            return client;
        }

        [HttpPost]
        public async Task<ActionResult<Client>> Create(Client client)
        {
            await _clientService.Create(client);
            return Ok(client);
        }

        [Route("/update/{id}")]
        [HttpPut("/update/{id:length(37)}")]
        public async Task<ActionResult<Client>> Update(string id, Client newClientData)
        {
            var client = _clientService.Get(id);
            newClientData.Id = id;

            if(client == null) 
                return NotFound();

            await _clientService.Update(newClientData);

            return Ok(newClientData);
        }

        // [HttpDelete("id:length(37)")]
        // public IActionResult Delete(string id)
        // {
        //     var client = _clientService.Get(id);
            
        //     if(client == null)
        //     {
        //         return NotFound();
        //     }
            
        //     _clientService.Delete(client.Id);
            
        //     return NoContent();
        // }
    }
}