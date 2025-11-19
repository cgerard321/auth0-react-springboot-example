package org.demo.demo.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class AddRole {
    @NotBlank
    public String userId;

    public AddRole(String userId) {
        this.userId = userId;
    }
}
