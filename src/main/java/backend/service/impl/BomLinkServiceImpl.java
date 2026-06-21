package backend.service.impl;

import backend.dto.BomLinkDTO;
import backend.entity.BomLink;
import backend.entity.Item;
import backend.repository.BomLinkRepository;
import backend.repository.ItemRepository;
import backend.service.BomLinkService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BomLinkServiceImpl implements BomLinkService {

    private final BomLinkRepository bomLinkRepository;
    private final ItemRepository itemRepository;

    public BomLinkServiceImpl(BomLinkRepository bomLinkRepository,
                              ItemRepository itemRepository) {
        this.bomLinkRepository = bomLinkRepository;
        this.itemRepository = itemRepository;
    }

    // ---------------- CREATE ----------------
    @Override
    public BomLinkDTO createBomLink(BomLinkDTO dto) {

        if (dto.getParentItemId().equals(dto.getChildItemId())) {
            throw new RuntimeException("Self reference not allowed");
        }

        Item parent = itemRepository.findById(dto.getParentItemId())
                .orElseThrow(() -> new RuntimeException("Parent item not found"));

        Item child = itemRepository.findById(dto.getChildItemId())
                .orElseThrow(() -> new RuntimeException("Child item not found"));

        BomLink bom = new BomLink();
        bom.setParentItem(parent);
        bom.setChildItem(child);
        bom.setQuantity(dto.getQuantity());
        bom.setUnit(dto.getUnit());

        BomLink saved = bomLinkRepository.save(bom);

        return toDTO(saved);
    }

    // ---------------- GET BY ID ----------------
    @Override
    public BomLinkDTO getBomLinkById(Long id) {

        BomLink bom = bomLinkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BOM not found"));

        return toDTO(bom);
    }

    // ---------------- GET ALL ----------------
    @Override
    public List<BomLinkDTO> getAllBomLinks() {

        return bomLinkRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // ---------------- UPDATE ----------------
    @Override
    public BomLinkDTO updateBomLink(Long id, BomLinkDTO dto) {

        BomLink existing = bomLinkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("BOM not found"));

        Item parent = itemRepository.findById(dto.getParentItemId())
                .orElseThrow(() -> new RuntimeException("Parent item not found"));

        Item child = itemRepository.findById(dto.getChildItemId())
                .orElseThrow(() -> new RuntimeException("Child item not found"));

        if (parent.getId().equals(child.getId())) {
            throw new RuntimeException("Self reference not allowed");
        }

        existing.setParentItem(parent);
        existing.setChildItem(child);
        existing.setQuantity(dto.getQuantity());
        existing.setUnit(dto.getUnit());

        return toDTO(bomLinkRepository.save(existing));
    }

    // ---------------- DELETE ----------------
    @Override
    public void deleteBomLink(Long id) {

        if (!bomLinkRepository.existsById(id)) {
            throw new RuntimeException("BOM not found");
        }

        bomLinkRepository.deleteById(id);
    }

    // ---------------- MAPPER ----------------
    private BomLinkDTO toDTO(BomLink bom) {

        BomLinkDTO dto = new BomLinkDTO();

        dto.setId(bom.getId());
        dto.setParentItemId(bom.getParentItem().getId());
        dto.setChildItemId(bom.getChildItem().getId());
        dto.setQuantity(bom.getQuantity());
        dto.setUnit(bom.getUnit());

        return dto;
    }
}