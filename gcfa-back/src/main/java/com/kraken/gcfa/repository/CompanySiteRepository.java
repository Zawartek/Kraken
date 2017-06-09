package com.kraken.gcfa.repository;

import com.kraken.gcfa.entity.CompanySite;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 17/04/2017.
 * gcfa-back
 */
public interface CompanySiteRepository extends CrudRepository<CompanySite, Long> {
	CompanySite findByName(String name);
	void deleteByName(String name);
}
