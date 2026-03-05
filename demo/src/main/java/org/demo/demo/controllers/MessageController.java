package org.demo.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.demo.demo.models.Message;
import org.demo.demo.services.MessageService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
@CrossOrigin(origins = {"http://localhost:3000", "https://authdemofe-92dc7.ondigitalocean.app/"})
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

    @GetMapping("/protected/customer")
    @PreAuthorize("hasAuthority('read:customer')")
    public Message getProtectedCustomer(@AuthenticationPrincipal Jwt user) {
        return messageService.getCustomerMessage(user);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('read:admin-messages')")
    public Message getAdmin() {
        return messageService.getAdminMessage();
    }

    @PostMapping("/role")
    @PreAuthorize("hasAuthority('write:role')")
    public Message postRole(@RequestBody AddRole addRole) throws UnirestException, JSONException {
        return messageService.addRole(addRole);
    }
}
