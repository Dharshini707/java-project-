package backend.mapper;

import backend.dto.ItemDTO;
import backend.entity.Item;

public class ItemMapper {

    // Entity -> DTO
    public static ItemDTO toDTO(Item item) {
        if (item == null) {
            return null;
        }

        return new ItemDTO(
                item.getId(),
                item.getItemCode(),
                item.getItemName(),
                item.getItemType(),
                item.getDescription(),
                item.getUnit()
        );
    }

    // DTO -> Entity
    public static Item toEntity(ItemDTO dto) {
        if (dto == null) {
            return null;
        }

        Item item = new Item();
        item.setId(dto.getId());
        item.setItemCode(dto.getItemCode());
        item.setItemName(dto.getItemName());
        item.setItemType(dto.getItemType());
        item.setDescription(dto.getDescription());
        item.setUnit(dto.getUnit());

        return item;
    }
}