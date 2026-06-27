package backend.service;

import backend.dto.ItemDTO;
import java.util.List;
import org.springframework.data.domain.Page;

public interface ItemService {

    ItemDTO createItem(ItemDTO itemDTO);

    ItemDTO getItemById(Long id);

    List<ItemDTO> getAllItems();

    ItemDTO updateItem(Long id, ItemDTO itemDTO);

    List<ItemDTO> searchItems(String name);

    Page<ItemDTO> getItemsWithPagination(int page, int size, String sortBy);

    void deleteItem(Long id);
}