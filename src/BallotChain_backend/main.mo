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
  public type Votedlist={
    Principaid:Principal;
    NominatedId:Nat64;
    NominatedFor:Text;
  };
  
  var AddNominate: [Nominate]=[];
  var AddParticipant:[Participants]=[];
  var votedata:[Votedlist] = [];
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

  public func votedDetails(detailsofVote:Votedlist):async Text{
    votedata:=Array.append<Votedlist>(votedata,[detailsofVote]);
    return detailsofVote.NominatedFor;
  };

  public shared query func GetVotedDataByProp(NominatedId:Nat64):async [Votedlist]{
    return Array.filter<Votedlist>(votedata, func x=x.NominatedId == NominatedId);
  };

  public shared query func GetSubmittedDetbyId(Principaid:Principal) :async [Votedlist]{
    return Array.filter<Votedlist>(votedata, func x=x.Principaid == Principaid);
  };

  public shared query func GetNominataionsById(Principal:Principal):async [Nominate]{
    return Array.filter<Nominate>(AddNominate,func x=x.Principal == Principal);
  };

  public shared query func GetParticipantsById(NominateId:Nat64):async ?Participants{
    return Array.find<Participants>(AddParticipant,func x=x.NominateId == NominateId);
  };






}
