package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.County;
import com.mycompany.myapp.service.CountyService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.County}.
 */
@RestController
@RequestMapping("/api")
public class CountyResource {

    private final Logger log = LoggerFactory.getLogger(CountyResource.class);

    private static final String ENTITY_NAME = "county";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CountyService countyService;

    public CountyResource(CountyService countyService) {
        this.countyService = countyService;
    }

    /**
     * {@code POST  /counties} : Create a new county.
     *
     * @param county the county to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new county, or with status {@code 400 (Bad Request)} if the county has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/counties")
    public ResponseEntity<County> createCounty(@RequestBody County county) throws URISyntaxException {
        log.debug("REST request to save County : {}", county);
        if (county.getId() != null) {
            throw new BadRequestAlertException("A new county cannot already have an ID", ENTITY_NAME, "idexists");
        }
        County result = countyService.save(county);
        return ResponseEntity.created(new URI("/api/counties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /counties} : Updates an existing county.
     *
     * @param county the county to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated county,
     * or with status {@code 400 (Bad Request)} if the county is not valid,
     * or with status {@code 500 (Internal Server Error)} if the county couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/counties")
    public ResponseEntity<County> updateCounty(@RequestBody County county) throws URISyntaxException {
        log.debug("REST request to update County : {}", county);
        if (county.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        County result = countyService.save(county);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, county.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /counties} : get all the counties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of counties in body.
     */
    @GetMapping("/counties")
    public List<County> getAllCounties() {
        log.debug("REST request to get all Counties");
        return countyService.findAll();
    }

    /**
     * {@code GET  /counties/:id} : get the "id" county.
     *
     * @param id the id of the county to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the county, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/counties/{id}")
    public ResponseEntity<County> getCounty(@PathVariable Long id) {
        log.debug("REST request to get County : {}", id);
        Optional<County> county = countyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(county);
    }

    /**
     * {@code DELETE  /counties/:id} : delete the "id" county.
     *
     * @param id the id of the county to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/counties/{id}")
    public ResponseEntity<Void> deleteCounty(@PathVariable Long id) {
        log.debug("REST request to delete County : {}", id);
        countyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/counties?query=:query} : search for the county corresponding
     * to the query.
     *
     * @param query the query of the county search.
     * @return the result of the search.
     */
    @GetMapping("/_search/counties")
    public List<County> searchCounties(@RequestParam String query) {
        log.debug("REST request to search Counties for query {}", query);
        return countyService.search(query);
    }
}
