package backend.service;

import backend.dto.ItemDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ItemService {

    ItemDTO createItem(ItemDTO itemDTO);

    ItemDTO getItemById(Long id);

    List<ItemDTO> getAllItems();

    ItemDTO updateItem(Long id, ItemDTO itemDTO);

    List<ItemDTO> searchItems(String name);

    List<ItemDTO> searchItemsByType(String itemType);

    Page<ItemDTO> getItemsWithPagination(int page, int size, String sortBy);

    void deleteItem(Long id);
}