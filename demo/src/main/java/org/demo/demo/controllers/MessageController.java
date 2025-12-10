package org.demo.demo.controllers;

import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.RequiredArgsConstructor;
import org.demo.demo.models.AddRole;
import org.demo.demo.models.Message;
import org.demo.demo.services.MessageService;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/public")
    public Message getPublic() {
        return messageService.getPublicMessage();
    }

    @GetMapping("/test")
    public Message getTest() {
        return messageService.getTestMessage();
    }

    @GetMapping("/protected")
    public Message getProtected() {
        return messageService.getProtectedMessage();
    }

    @GetMapping("/protected/customer")
    public Message getProtectedCustomer() {
        // Authentication removed - returning dummy message
        return messageService.getCustomerMessage();
    }

    @GetMapping("/admin")
    public Message getAdmin() {
        return messageService.getAdminMessage();
    }

    @PostMapping("/role")
    public Message postRole(@RequestBody AddRole addRole) throws UnirestException, JSONException {
        return messageService.addRole(addRole);
    }
}
