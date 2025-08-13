package booking.service.controller;

import booking.service.dto.accommodation.AccommodationDto;
import booking.service.dto.accommodation.CreateAccommodationRequestDto;
import booking.service.service.AccommodationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Accommodation management", description = "Endpoints for managing accommodations")
@RequiredArgsConstructor
@RestController
@RequestMapping("/accommodations")
public class AccommodationController {

    private final AccommodationService accommodationService;

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Save a new accommodation", description = "Add a new accommodation to inventory")
    public AccommodationDto save(@RequestBody @Valid CreateAccommodationRequestDto requestDto) {
        return accommodationService.save(requestDto);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'MANAGER')")
    @GetMapping
    @Operation(summary = "Get a list of accommodations", description = "Get a page of available accommodations")
    public Page<AccommodationDto> findAll(Pageable pageable) {
        return accommodationService.findAll(pageable);
    }

    @PreAuthorize("hasAnyRole('CUSTOMER', 'MANAGER')")
    @GetMapping("/{id}")
    @Operation(summary = "Get accommodation's detailed information",
            description = "Get detailed accommodation info by selected id")
    public AccommodationDto findById(@PathVariable Long id) {
        return accommodationService.findById(id);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PutMapping("/{id}")
    @Operation(summary = "Update accommodation", description = "Update accommodation details by id")
    public AccommodationDto update(@PathVariable Long id,
            @RequestBody @Valid CreateAccommodationRequestDto requestDto) {
        return accommodationService.update(id, requestDto);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete accommodation", description = "Remove accommodation by id")
    public void delete(@PathVariable Long id) {
        accommodationService.deleteById(id);
    }
}
