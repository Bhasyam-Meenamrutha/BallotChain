// actor {
//   public query func greet(name : Text) : async Text {
//     return "Hello, " # name # "!";
//   };
// };
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor{
  var nominateIdCounter: Nat64 = 0;
  public type NominateId = Nat64 ;
  public type Nominate = {
    Principal : Principal;
    NominateId: Nat64;
    NominatePorpose: Text;
    };
  public type Participants= {
    NominateId : Nat64;
    Participant :[Text];

  };
  
  

  var AddNominate: [Nominate]=[];
  var AddParticipant:[Participants]=[];
  

public func CreateNomination(details:Nominate): async Nat64 {
    let newNominate = {
        Principal = details.Principal;
        NominateId = nominateIdCounter;
        NominatePorpose = details.NominatePorpose;
    };
    AddNominate := Array.append<Nominate>(AddNominate, [newNominate]);
    nominateIdCounter += 1;
    return newNominate.NominateId ;
};

  public func CreateParticipants(part:Participants):async Text{
    AddParticipant:=Array.append<Participants>(AddParticipant,[part]);
    return "Participants Added Sucessfully"
  };

  public shared query func GetNominataions(): async [Nominate] {
    return AddNominate;
  
  };

  public shared query func GetNominataionsById(Principal:Principal):async ?Nominate{
    return Array.find<Nominate>(AddNominate,func x=x.Principal == Principal);
  };

  public shared query func GetParticipantsById(NominateId:Nat64):async ?Participants{
    return Array.find<Participants>(AddParticipant,func x=x.NominateId == NominateId);
  };






}
