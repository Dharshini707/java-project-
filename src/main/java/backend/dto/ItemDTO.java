package backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ItemDTO {

    private Long id;

    @NotBlank(message = "Item code cannot be empty")
    @Size(max = 20, message = "Item code cannot exceed 20 characters")
    private String itemCode;

    @NotBlank(message = "Item name cannot be empty")
    @Size(max = 100, message = "Item name cannot exceed 100 characters")
    private String itemName;

    @NotBlank(message = "Unit cannot be empty")
    @Size(max = 10, message = "Unit cannot exceed 10 characters")
    private String unit;

    public ItemDTO() {
    }

    public ItemDTO(Long id, String itemCode, String itemName, String unit) {
        this.id = id;
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.unit = unit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}