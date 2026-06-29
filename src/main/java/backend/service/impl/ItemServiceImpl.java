package backend.service.impl;

import backend.dto.ItemDTO;
import backend.entity.Item;
import backend.exception.ItemNotFoundException;
import backend.mapper.ItemMapper;
import backend.repository.ItemRepository;
import backend.service.ItemService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public ItemDTO createItem(ItemDTO itemDTO) {

        Item item = ItemMapper.toEntity(itemDTO);

        Item savedItem = itemRepository.save(item);

        return ItemMapper.toDTO(savedItem);
    }

    @Override
    public List<ItemDTO> searchItems(String name) {

        List<Item> items;

        if (name != null && !name.isBlank()) {
            items = itemRepository.findByItemNameContainingIgnoreCase(name);
        } else {
            items = itemRepository.findAll();
        }

        return items.stream()
                .map(ItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDTO getItemById(Long id) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() ->
                        new ItemNotFoundException("Item not found with id " + id));

        return ItemMapper.toDTO(item);
    }

    @Override
    public List<ItemDTO> getAllItems() {

        return itemRepository.findAll()
                .stream()
                .map(ItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {

        Item item = itemRepository.findById(id)
                .orElseThrow(() ->
                        new ItemNotFoundException("Item not found with id " + id));

        item.setItemCode(itemDTO.getItemCode());
        item.setItemName(itemDTO.getItemName());
        item.setItemType(itemDTO.getItemType());
        item.setDescription(itemDTO.getDescription());
        item.setUnit(itemDTO.getUnit());

        Item updatedItem = itemRepository.save(item);

        return ItemMapper.toDTO(updatedItem);
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public Page<ItemDTO> getItemsWithPagination(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy)
        );

        return itemRepository.findAll(pageable)
                .map(ItemMapper::toDTO);
    }

    @Override
public List<ItemDTO> searchItemsByType(String itemType) {

    List<Item> items;

    if (itemType != null && !itemType.isBlank()) {
        items = itemRepository.findByItemTypeContainingIgnoreCase(itemType);
    } else {
        items = itemRepository.findAll();
    }

    return items.stream()
            .map(ItemMapper::toDTO)
            .collect(Collectors.toList());
}
}