package com.essat.springfootball.controller;

import com.essat.springfootball.dao.IAdherant;
import com.essat.springfootball.dao.IAdministrateur;
import com.essat.springfootball.dao.IReservation;
import com.essat.springfootball.dao.ITerrain;
import com.essat.springfootball.model.Adherant;
import com.essat.springfootball.model.Administrateur;
import com.essat.springfootball.model.Reservation;
import com.essat.springfootball.model.Terrain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200/")
public class AuthCTR {

    @Autowired
    private IAdministrateur adminDAO;

    @Autowired
    private ITerrain terrainDAO;

    @Autowired
    private IReservation resDAO;

    @Autowired
    private IAdherant adhDAO;


    @PostMapping("/login")
    public ResponseEntity<Administrateur> loginAdmin(@RequestBody Administrateur adminData) {
        Administrateur admin = adminDAO.findByUsername((adminData.getUsername()));

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); 
        }
        if (admin.getPassword().equals(adminData.getPassword())) {
            return ResponseEntity.ok(admin); 
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); 
    }


    @GetMapping("/terrain")
    public List<Terrain> f1() {
        return terrainDAO.findAll();
    }

    @GetMapping("/resevation")
    public List<Reservation> f2() {
        return resDAO.findAll();
    }


    @GetMapping("/Adherant")
    public List<Adherant> f3() { return adhDAO.findAll();}

    @DeleteMapping("/terrain/{id}")
    public ResponseEntity<String> deleteTerrain(@PathVariable int id) {
        if (!terrainDAO.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Terrain not found.");
        }

        List<Reservation> linkedReservations = resDAO.findByTerrainId(id);
        if (linkedReservations != null && !linkedReservations.isEmpty()) {
            resDAO.deleteAll(linkedReservations);
        }

        terrainDAO.deleteById(id);
        return ResponseEntity.ok("Terrain deleted successfully, along with related reservations.");
    }


    @DeleteMapping("/reservation/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable int id) {
        if (resDAO.existsById(id)) {
            resDAO.deleteById(id);
            return ResponseEntity.ok("Reservation deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found.");
    }

    @DeleteMapping("/adherent")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<String> deleteAdherent(@PathVariable int id) {
        if (!adhDAO.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Adherent not found.");
        }
        adhDAO.deleteById(id);
        return ResponseEntity.ok("Adherent deleted successfully.");
    }


    @PostMapping("/addReservation")
    public ResponseEntity<String> addReservation(@RequestBody Reservation reservation) {
        Optional<Terrain> optionalTerrain = terrainDAO.findById(reservation.getTerrain().getId());

        if (optionalTerrain.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Terrain non trouvé");
        }

        Terrain terrain = optionalTerrain.get();
        List<Reservation> existingReservations = resDAO.findByTerrainAndDate(terrain, reservation.getDate_res());
        if (!existingReservations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Le terrain est déjà réservé à cette heure");
        }
        resDAO.save(reservation);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Réservation créée avec succès");
    }


    @PostMapping("/terrain")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<String> addTerrain(@RequestBody Terrain terrain) {
        if (terrain.getNom() == null || terrain.getSurface() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nom and Surface are required.");
        }

        terrainDAO.save(terrain);
        return ResponseEntity.status(HttpStatus.CREATED).body("Terrain added successfully.");
    }

    @PostMapping("/adherant")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<String> addAdherant(@RequestBody Adherant adherant) {
        if (adherant.getNom() == null || adherant.getEmail() == null ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nom and Email are required.");
        }
        adhDAO.save(adherant);
        return ResponseEntity.status(HttpStatus.CREATED).body("Adhérant added successfully.");
    }



}
