package backend.controller;

import backend.dto.BomLinkDTO;
import backend.service.BomLinkService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bom")
public class BomLinkController {

    private final BomLinkService bomLinkService;

    public BomLinkController(BomLinkService bomLinkService) {
        this.bomLinkService = bomLinkService;
    }

    // CREATE BOM
    @PostMapping
    public ResponseEntity<BomLinkDTO> create(@Valid @RequestBody BomLinkDTO dto) {
        return ResponseEntity.ok(bomLinkService.createBomLink(dto));
    }

    // GET ALL BOM LINKS
    @GetMapping
    public ResponseEntity<List<BomLinkDTO>> getAll() {
        return ResponseEntity.ok(bomLinkService.getAllBomLinks());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<BomLinkDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(bomLinkService.getBomLinkById(id));
    }

    // UPDATE BOM
    @PutMapping("/{id}")
    public ResponseEntity<BomLinkDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody BomLinkDTO dto) {
        return ResponseEntity.ok(bomLinkService.updateBomLink(id, dto));
    }

    // DELETE BOM
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bomLinkService.deleteBomLink(id);
        return ResponseEntity.noContent().build();
    }
}