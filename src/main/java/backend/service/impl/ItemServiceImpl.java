package backend.service.impl;

import backend.dto.ItemDTO;
import backend.entity.Item;
import backend.repository.ItemRepository;
import backend.service.ItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    private ItemDTO mapToDTO(Item item) {
        return new ItemDTO(
                item.getId(),
                item.getItemCode(),
                item.getItemName(),
                item.getUnit()
        );
    }

    private Item mapToEntity(ItemDTO dto) {
        Item item = new Item();
        item.setId(dto.getId());
        item.setItemCode(dto.getItemCode());
        item.setItemName(dto.getItemName());
        item.setUnit(dto.getUnit());
        return item;
    }

    @Override
    public ItemDTO createItem(ItemDTO itemDTO) {
        Item item = mapToEntity(itemDTO);
        Item saved = itemRepository.save(item);
        return mapToDTO(saved);
    }

    @Override
    public ItemDTO getItemById(Long id) {
        Item item = itemRepository.findById(id).orElseThrow();
        return mapToDTO(item);
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {

        Item item = itemRepository.findById(id).orElseThrow();

        item.setItemCode(itemDTO.getItemCode());
        item.setItemName(itemDTO.getItemName());
        item.setUnit(itemDTO.getUnit());

        Item updated = itemRepository.save(item);

        return mapToDTO(updated);
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }
}