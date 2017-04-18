package com.kraken.gcfa.services;

import com.kraken.gcfa.constants.RolesNames;
import com.kraken.gcfa.dto.FormApprenticeDTO;
import com.kraken.gcfa.entity.Apprentice;
import com.kraken.gcfa.entity.CompanySite;
import com.kraken.gcfa.entity.Tutor;
import com.kraken.gcfa.entity.User;
import com.kraken.gcfa.repository.ApprenticeRepository;
import com.kraken.gcfa.repository.CompanySiteRepository;
import com.kraken.gcfa.repository.TutorRepository;
import com.kraken.gcfa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/04/2017.
 * gcfa-back
 */
@Service
public class UserService {

    @Autowired
    private ApprenticeRepository apprenticeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private CompanySiteRepository companySiteRepository;

    public Apprentice getApprentice(User user) {
        return apprenticeRepository.findByUser(user);
    }

    public Apprentice createApprentice(FormApprenticeDTO form) throws Exception {
        User user = userRepository.findOne(form.getUserId());
        Tutor tutor = tutorRepository.findOne(form.getTutorId());
        CompanySite companySite = companySiteRepository.findOne(form.getCompanyId());

        if (user.getRole().getName().equals(RolesNames.APPRENTICE)) {
            Apprentice apprentice = new Apprentice();
            apprentice.setContractType(form.getContractType());
            apprentice.setUser(user);
            apprentice.setTutor(tutor);
            apprentice.setCompanySite(companySite);
            apprenticeRepository.save(apprentice);
            return apprentice;
        } else {
            throw new Exception("This user is not an apprentice");
        }
    }
}
