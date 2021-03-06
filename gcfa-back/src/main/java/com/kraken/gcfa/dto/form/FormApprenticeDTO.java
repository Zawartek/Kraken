package com.kraken.gcfa.dto.form;

import com.kraken.gcfa.entity.ContractType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * Created by Guillaume on 17/04/2017.
 * gcfa-back
 */
public class FormApprenticeDTO {

    private Long userId;
    private Long tutorId;
    private ContractType contractType;
    private Integer promotion;

    private Long companyId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Integer getPromotion() {
        return promotion;
    }

    public void setPromotion(Integer promotion) {
        this.promotion = promotion;
    }
}
