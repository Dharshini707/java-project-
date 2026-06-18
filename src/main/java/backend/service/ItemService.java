package backend.service;

import backend.dto.ItemDTO;
import java.util.List;

public interface ItemService {

    ItemDTO createItem(ItemDTO itemDTO);

    ItemDTO getItemById(Long id);

    List<ItemDTO> getAllItems();

    ItemDTO updateItem(Long id, ItemDTO itemDTO);

    void deleteItem(Long id);
}