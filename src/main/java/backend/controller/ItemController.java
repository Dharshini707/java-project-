package backend.controller;

import backend.dto.ItemDTO;
import backend.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@Valid @RequestBody ItemDTO itemDTO) {
        return new ResponseEntity<>(itemService.createItem(itemDTO), HttpStatus.CREATED);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    // SEARCH
    @GetMapping("/search")
    public ResponseEntity<List<ItemDTO>> searchItems(
            @RequestParam(required = false) String name) {

        return ResponseEntity.ok(itemService.searchItems(name));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> updateItem(
            @PathVariable Long id,
            @Valid @RequestBody ItemDTO itemDTO) {

        return ResponseEntity.ok(itemService.updateItem(id, itemDTO));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.ok("Item deleted successfully");
    }
}