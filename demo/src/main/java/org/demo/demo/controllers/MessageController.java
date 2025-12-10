package org.demo.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.demo.demo.models.Message;
import org.demo.demo.services.MessageService;
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
        return messageService.getCustomerMessage();
    }

    @GetMapping("/admin")
    public Message getAdmin() {
        return messageService.getAdminMessage();
    }
}
