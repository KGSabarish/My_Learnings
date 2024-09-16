package com.example;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    @PostMapping("/processInputs")
    public String processInputs(@RequestBody String input) {
        // Process the input here
//        String processedInput = "Processed: " + input;
        System.out.println("Datas From JS :" +input);
        return input;
    }
}
