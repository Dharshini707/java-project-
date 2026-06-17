package backend.dto;

public class ItemDTO {

    private Long id;
    private String itemCode;
    private String itemName;
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