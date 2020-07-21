package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.County;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link County}.
 */
public interface CountyService {

    /**
     * Save a county.
     *
     * @param county the entity to save.
     * @return the persisted entity.
     */
    County save(County county);

    /**
     * Get all the counties.
     *
     * @return the list of entities.
     */
    List<County> findAll();


    /**
     * Get the "id" county.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<County> findOne(Long id);

    /**
     * Delete the "id" county.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the county corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<County> search(String query);
}
