package backend.controller;

import backend.dto.ItemDTO;
import backend.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ItemDTO createItem(@RequestBody ItemDTO itemDTO) {
        return itemService.createItem(itemDTO);
    }

    @GetMapping("/{id}")
    public ItemDTO getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @GetMapping
    public List<ItemDTO> getAllItems() {
        return itemService.getAllItems();
    }

    @PutMapping("/{id}")
    public ItemDTO updateItem(@PathVariable Long id,
                              @RequestBody ItemDTO itemDTO) {
        return itemService.updateItem(id, itemDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }
}